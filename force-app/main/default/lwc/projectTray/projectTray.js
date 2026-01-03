import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class ProjectTray extends NavigationMixin(LightningElement) {
    handleFocusClick(){
        try {
            const pageReference = {
                type: 'standard__namedPage',
                attributes: {
                    pageName: 'pomodoroTimer'
                },
                state: {
                    c__mode: 'focus'
                }
            };
            
            this[NavigationMixin.GenerateUrl](pageReference).then((url) => {
                console.log('Generated URL:', url);
                url ='https://kamil-kamranportfolio-dev-ed.develop.my.site.com/pomodoroTimer';
                if (url) {
                    window.open(url, '_blank');
                }
            }).catch((error) => {
                console.error('Error generating URL:', error);
            });
        } catch (error) {
            console.error('Exception in handleFocusClick:', error);
        }
    }
}