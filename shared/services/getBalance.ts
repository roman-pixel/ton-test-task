export const getBalance = async (address: string | undefined) => {
  try {
    const res = await fetch(
      `https://testnet.toncenter.com/api/v2/getAddressBalance?address=${address}`,
    );

    const result = await res.json();
    return result;
  } catch (error) {
    console.error(console.error("Error [GET BALANCE]", error));
  }
};
