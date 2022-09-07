export const dollarize = (value: number) => value.toLocaleString("en-US", { style: "currency", currency: "USD" });
