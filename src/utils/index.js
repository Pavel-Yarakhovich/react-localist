import { merge } from "lodash";

export const prepareInitialData = (loadedData) => {
  const dataObj = {};
  loadedData.forEach((x) => {
    dataObj[x.data[0]] = x.data.slice(1);
  });
  return dataObj;
};

export const prepareInitialDataFromJson = (files) => {
  function handleFile(initialJSON) {
    const dataTitle = initialJSON.accessor;
    const initialData = { ...initialJSON };
    delete initialData.accessor;
    const data = {};

    function processKeyValuePair(dataObj, baseKey) {
      Object.entries(dataObj).forEach(([key, value]) => {
        const dataKey = baseKey ? `${baseKey}.${key}` : key;
        if (typeof value === "string") {
          data[dataKey] = data[dataKey] ? [...data[dataKey], value] : [value];
        } else {
          processKeyValuePair(value, dataKey);
        }
      });
    }
    processKeyValuePair(initialData);

    return { accessor: dataTitle, data };
  }

  return files.map((f) => handleFile(f));
};

export const combineTranslations = (translationFiles) => {
  if (translationFiles.length === 0) return;
  const mainFile = translationFiles[0];
  const updatedMainFileData = Object.entries(mainFile.data).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: { [mainFile.accessor]: value } }),
    {}
  );
  mainFile.data = updatedMainFileData;
  translationFiles.slice(1).forEach((file) => {
    Object.entries(file.data).forEach(([key, value]) => {
      if (mainFile.data[key]) {
        mainFile.data[key] = {
          ...mainFile.data[key],
          [file.accessor]: value,
        };
      }
    });
  });

  const preparedData = Object.entries(mainFile.data).reduce(
    (acc, [uniqueKey, x]) => {
      const upd = Object.entries(x).reduce(
        (a, [k, v]) => ({ ...a, [k]: v[0] }),
        {}
      );
      return [...acc, { uniqueKey, ...upd }];
    },
    []
  );

  const columns = translationFiles.map((f) => ({
    Header: f.accessor,
    accessor: f.accessor,
  }));

  return {
    columns: [{ Header: "Key", accessor: "uniqueKey" }, ...columns],
    data: preparedData,
  };
};

export const downloadAsJsonFile = async (data, fileName) => {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = fileName + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const transformKeyIntoTree = (key, value) => {
  const parsedKey = key.split(".");
  if (parsedKey?.length === 1) {
    return { [key]: value };
  }

  let obj = {};

  for (let i = parsedKey.length - 1; i > -1; i--) {
    obj = { [parsedKey[i]]: i === parsedKey.length - 1 ? value : obj };
  }

  return obj;
};

export const convertUpdatedTableDataToJsonLikeStructure = (data) => {
  const futureFiles = {};

  function handleRow(row) {
    for (let columnKey in row) {
      if (columnKey !== "uniqueKey") {
        const currRow = futureFiles[columnKey] ?? {};
        futureFiles[columnKey] = {
          ...merge(
            currRow,
            transformKeyIntoTree(row.uniqueKey, row[columnKey])
          ),
        };
      }
    }
  }

  data.forEach((row) => handleRow(row));

  Object.entries(futureFiles).forEach(([key, value]) =>
    downloadAsJsonFile(value, key)
  );
};
