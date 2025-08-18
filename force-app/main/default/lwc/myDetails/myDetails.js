import { LightningElement, wire } from 'lwc';
import POM_Image from "@salesforce/resourceUrl/Achievements1";
import gracias from "@salesforce/resourceUrl/Gracias";
import Insta_Awards from "@salesforce/resourceUrl/Insta_Awards";
import getAccountList from '@salesforce/apex/myDetailsController.getAccounts';
import getProjects from '@salesforce/apex/myDetailsController.getProject';
export default class MyDetails extends LightningElement {

    activeSections = ['A', 'C'];
    activeSectionsMessage = '';
    performanceImage = POM_Image;
    graciasAward = gracias;
    instaAwardInfosys = Insta_Awards;
    accounts;
    projects;
    skills = ['JavaScript', 'HTML', 'CSS','DSA','git & Github', 'REST API Integrartions','Salesforce', 'Flow builder', 'Apex', 'LWC','Java','Apex Triggers','vlocity Order Management', 'vlocity Integration Procedures', 'vlocity Data Raptors'];
    Certifications = ['Platform Developer I','Salesforce Certified Administrator','Salesforce Associate'];
    Experience={
        Infosys: ['Working Currently in Renowned Telecom Industry Project.',
                  'onsult and Implement features in vlocity Order Orchestration in different scenarios.',
                  'Utilise and leverage vlocity Integration Procedures and Data transforms / Data Raptors.',
                   'Create Autotask and Orchestration Item Implementations in Apex to orchestrate orders to upstream and Downstream Systems.',
                  'Orchestrate Orders through Callout via Integration Procedure and Apex to Downstream systems for further Provisioning.'],
        Salesforce:['Implement CPQ custom solutions for client to achieve the required business goals.',
                     'work with consultant partener developers and architects to resolve business impacting blockers on implementations.',
                     'Conduct Code reviews and solution reviews for their Implementations.',
                     'Enforce Best practices on codes and Implementations.',
                     'Consult with Apex and flows utilization with CPQ while following Industry standards.'
        ],
        BugendaiTech:['Worked on APEX development for creating custom solutions on the Salesforce platform for Clients. worked on managed & unmanaged Packages and added features and Customizations.',
                      'Created Triggers, LWC components, Test classes, and Unit testing. Asynchronous Apex(ex:future method, schedulable, queueable ) classes.Custom FSL(Field service Lightning).',
                      'Version control, Salesforce DX projects, Agile, and deployment.Analytical and critical thinking in solution design.',
                      'Worked on areas such as managing clients, understanding client\'s business use cases, Requirement Gathering, Analyzation, solution designing, Data modeling, feature development,Implementation, Testing, and Deployment.',
                      'Based on the Client\'s Requirements I provided them the correct Declarative/Custom Solutions and approach to solve the problem.',
                      'Used REST APIs to do various third-party integrations of salesforce with external systems.'
        ]
    };
    summary ={};
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
        const url = 'https://kamil-kamranportfolio-dev-ed.develop.my.salesforce.com/sfc/p/dL00000T3Tw5/a/dL0000007uQT/M3l9M8zxAWSK6zO7OsWF_x.Sas0t_1A1P4iIKOXd4qM';
        window.open(url, '_blank');
    }
    
    @wire(getAccountList)
    accounts({error,data})
    {
        if(data)
        {
            this.accounts = data;
            console.log(this.accounts);
            this.summary = data[0].Summary__c.replace('<ul><li>','').replace('</li></ul>','');
        }
        else if(error)
        {
            console.error('Error fetching accounts:', error);
        }
    }
    @wire(getProjects)
    projects({error,data})
    {
        if(data)
        {
            this.projects = data;
            console.log(this.projects);
        }
        else if(error)
        {
            console.error('Error fetching projects:', error);
        }
    }

}