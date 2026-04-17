export async function submitVisitReport(
  payload: any
) {
  console.log("LOCAL SUBMIT:", payload);

  return new Promise((resolve) =>
    setTimeout(() => resolve(true), 1000)
  );
}