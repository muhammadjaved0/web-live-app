export const getChartObject = (message: string) => {
  const parts: string[] = message.split("-:-");
  if (parts.length === 2) {
    const jsonString: string = parts[1];
    try {
      const jsonObject = JSON.parse(jsonString);
      return jsonObject
    } catch (error) {
      return "";
    }
  }
};
