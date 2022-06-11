import contract from "@truffle/contract"

export const loadContract = async (name, provider) => {
    const contractFile = await fetch(`/build/${name}.json`)
    const convertFile = await contractFile.json();
    const _myContract = contract(convertFile);
    _myContract.setProvider(provider);

    let deployedContratct = null;

    try{
        deployedContratct = await _myContract.deployed();
    }catch (e){
        console.error(e, "You are in the wrong network.")
    }
return deployedContratct;

}