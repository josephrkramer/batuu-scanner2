export function displayCargoHold(crateDecoder, scannedCrates, chainCode, chainCodeDecoder) {
    //read parameters from the url
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    console.log('Building the cargo hold display');
    const sortedCargoHold = crateDecoder.sortCargoHold(scannedCrates);
    const newCargoHoldList = [];

    for (const crateType of sortedCargoHold.keys()) {
        console.log(crateType);

        //create type list
        const crateTypeListItem = document.createElement('li');
        crateTypeListItem.className = "cargo-type-text";
        crateTypeListItem.appendChild(document.createTextNode(crateType));

        const crateTypeList = document.createElement('ul');
        crateTypeListItem.appendChild(crateTypeList);

        //populate type list with each instance of that type
        for (const crate of sortedCargoHold.get(crateType)) {
            //load the image
            const scannedImage = document.createElement('img');
            scannedImage.className = "scanned-list-item-image";
            scannedImage.src = crate.image;

            scannedImage.addEventListener('click', () => {
                cargoHold.style.display = 'none';
                setResult(crate.code);
            });

            //add the item to the scanned list
            const scannedListItem = document.createElement('li');
            scannedListItem.className = "scanned-list-item-text";
            scannedListItem.appendChild(scannedImage);
            if (urlParams.has('debug')) {
                scannedListItem.appendChild(document.createTextNode("  " + crate.code + " - " + crate.contents));
            } else {
                scannedListItem.appendChild(document.createTextNode("  " + crate.contents));
            }

            crateTypeList.appendChild(scannedListItem);
        }
        newCargoHoldList.push(crateTypeListItem);
    }

    if (chainCode.length > 0) {
        //add chain code
        const chainCodeListItem = document.createElement('li');
        chainCodeListItem.className = "cargo-type-text";
        chainCodeListItem.appendChild(document.createTextNode("Chain Code"));
        const chainCodeList = document.createElement('ul');
        chainCodeListItem.appendChild(chainCodeList);
        for (const code of chainCode) {
            const chainCodePart = chainCodeDecoder.decode(code);
            const scannedImage = document.createElement('img');
            scannedImage.className = "scanned-list-item-image";
            scannedImage.src = chainCodePart.image;

            scannedImage.addEventListener('click', () => {
                cargoHold.style.display = 'none';
                displayChainCodeResult(chainCodePart);
            });

            //add the item to the scanned list
            const scannedListItem = document.createElement('li');
            scannedListItem.className = "scanned-list-item-text";
            scannedListItem.appendChild(scannedImage);
            if (urlParams.has('debug')) {
                scannedListItem.appendChild(document.createTextNode("  " + chainCodePart.code + " - Chain Code Piece"));
            } else {
                scannedListItem.appendChild(document.createTextNode("  Chain Code Piece"));
            }

            chainCodeList.appendChild(scannedListItem);
        }
        newCargoHoldList.push(chainCodeListItem);
    }

    const cargoHoldList = document.getElementById('cargo-hold-list');
    cargoHoldList.replaceChildren(...newCargoHoldList);
}
