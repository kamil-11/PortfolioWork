import { LightningElement } from 'lwc';
import POM_Image from "@salesforce/resourceUrl/Achievements1";
import gracias from "@salesforce/resourceUrl/Gracias";
import Insta_Awards from "@salesforce/resourceUrl/Insta_Awards";
export default class MyDetails extends LightningElement {

    activeSections = ['A', 'C'];
    activeSectionsMessage = '';
    performanceImage = POM_Image;
    graciasAward = gracias;
    instaAwardInfosys = Insta_Awards;
    handleSectionToggle(event) {
        const openSections = event.detail.openSections;

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }
    }
    handleClick()
    {
        const url = 'https://kamil-kamranportfolio-dev-ed.develop.my.salesforce.com/sfc/p/dL00000T3Tw5/a/dL0000006uU9/Qallj9BzYxApCbE9mSfceEhkqg7nph325Nm8MkTUTXs';
        window.open(url, '_blank');
    }

}