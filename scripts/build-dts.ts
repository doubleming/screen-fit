import { Project } from 'ts-morph'
import { fileURLToPath } from 'url'
import { resolve, relative, dirname } from 'path'
import type { CompilerOptions, SourceFile } from 'ts-morph'
import { mkdir, readFile, writeFile } from 'fs/promises'
import * as vueCompiler from 'vue/compiler-sfc'
import { execa } from 'execa'
import glob from 'fast-glob'

const projRoot = resolve(fileURLToPath(import.meta.url), '..', '..')
const pkgRoot = resolve(projRoot, 'packages')
const TSCONFIG_PATH = resolve(projRoot, "tsconfig.build.json")

run()

async function run() {
  const compilerOptions: CompilerOptions = {
    emitDeclarationOnly: true,
    baseUrl: projRoot,
    preserveSymlinks: true,
    skipLibCheck: true,
    noImplicitAny: false,
    noEmitOnError: true,
  }
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  })
  const sourceFiles = await addSourceFiles(project)

  await project.emit({
    emitOnlyDtsFiles: true,
  })

  const tasks = sourceFiles.map(async (sourceFile) => {
    const relativePath = relative(pkgRoot, sourceFile.getFilePath())
    const emitOutput = sourceFile.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()
    if (emitFiles.length === 0) {
      throw new Error(`Emit no file: ${relativePath}`)
    }

    const subTasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath()
      await mkdir(dirname(filepath), {
        recursive: true,
      })

      await writeFile(
        filepath,
        outputFile.getText(),
        'utf8'
      )

      console.log(`Definition for file: ${relativePath} generated`)
    })

    await Promise.all(subTasks)
  })

  await Promise.all(tasks)

  await execa('rollup', ['-c', 'rollup.dts.config.js'], {
    stdio: 'inherit'
  })
}


function excludeFiles(files: string[]) {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist']
  return files.filter(
    (path) => !excludes.some((exclude) => path.includes(exclude))
  )
}

async function addSourceFiles(project: Project) {
  project.addSourceFileAtPath(resolve(projRoot, 'typings/env.d.ts'))

  const globSourceFile = '**/*.{ts?(x),vue}'
  const filePaths = excludeFiles(
    await glob([globSourceFile], {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true,
    })
  )
  const sourceFiles: SourceFile[] = []
  await Promise.all([
    ...filePaths.map(async (file) => {
      if (file.endsWith('.vue')) {
        const content = await readFile(file, 'utf-8')
        const sfc = vueCompiler.parse(content)
        const { script, scriptSetup } = sfc.descriptor
        if (script || scriptSetup) {
          let content = script?.content ?? ''

          if (scriptSetup) {
            const compiled = vueCompiler.compileScript(sfc.descriptor, {
              id: 'xxx',
            })
            content += compiled.content
          }
          const lang = scriptSetup?.lang || script?.lang || 'js'
          const sourceFile = project.createSourceFile(
            `${relative(process.cwd(), file)}.${lang}`,
            content
          )
          sourceFiles.push(sourceFile)
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file)
        sourceFiles.push(sourceFile)
      }
    }),
  ])

  return sourceFiles
}
