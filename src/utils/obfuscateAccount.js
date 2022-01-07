const obfuscateAccount = account => {
  const firstFive = account.substr(0, 5);
  const lastFive = account.substr(account.length - 4);
  return `${firstFive}...${lastFive}`.toLocaleUpperCase();
}

export default obfuscateAccount;