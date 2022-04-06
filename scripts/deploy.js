const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("creed");
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("kassandra",  {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain kassandra.creed");

    txn = await domainContract.setRecord("kassandra", "If I Was Your Punishment, You'd Already Be Dead");
    await txn.wait();
    console.log("Set record for kassandra.creed");

    const address = await domainContract.getAddress("kassandra");
    console.log("Owner of domain kassandra:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();