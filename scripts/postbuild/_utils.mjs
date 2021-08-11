/* eslint-disable import/prefer-default-export */
import { globby } from "globby";
import fs from "fs/promises";

export const BUILD_DIRECTORY = "dist";

export const replaceFilesContent = async (glob, callback) => {
	const out = `${BUILD_DIRECTORY}/${glob}`;
	const filePaths = await globby(out);
	const files = await Promise.all(
		filePaths.map(async (filePath) => ({
			path: filePath,
			content: await fs.readFile(filePath, "utf-8"),
		})),
	);
	const alteredFiles = await Promise.all(
		files.map(async ({ content, ...file }) => ({
			...file,
			content: await callback(content),
		})),
	);
	await Promise.all(
		alteredFiles.map(async ({ path, content }) =>
			fs.writeFile(path, content, "utf-8"),
		),
	);
};
