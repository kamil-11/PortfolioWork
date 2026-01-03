public class myDetailsController{
    @AuraEnabled(cacheable = true)
    public static Account[] getAccounts(){
        return [SELECT Id, Summary__c
                FROM Account
                where Name = 'Kamil Kamran'];
    }

    @AuraEnabled(cacheable = true)
    public static Map<String, List<String>> getProject(){
        String[] keyResponsibilities;
        List<String> finalKeyResponsibilities = new List<String>();
        Map<String, List<String>> projectMaps = new Map<String, List<String>>();
        Map<String, List<String>> headerKeyRespMap = new Map<String, List<String>>();
        Map<String, project__c> projectHeaderMap = new Map<String, project__c>();
        String responsibilitiesString;
        string temp = 'Responsible for writing all the backend server side logic in Apex.00Created multiple automations, programmatic and declarative to drive the business 00efficientl.>Built the backend functionality of custom field service lightning 00for the workers and resources to acknowledge Jobs and accept the dispatched job from the dispatcher on the dispatcher console.</li><li>Built the dispatcher console to dispatch jobs and added the function';
        List<Project__c> projects = [SELECT Id, Name, Header__c, Key_Responsibilities__c
                                     FROM Project__c];
        for (project__c project : projects){
            projectHeaderMap.put(project.Name, project);
        }
        for (String Name : projectHeaderMap.keySet()){
            project__c project = projectHeaderMap.get(Name);
            headerKeyRespMap.put(Name, project.Key_Responsibilities__c.split('\\.'));
        }
        for (String Name : headerKeyRespMap.keySet()){
            List<String> keyRespList = headerKeyRespMap.get(Name);
            for (String lString : keyRespList){
                responsibilitiesString = lString.replaceAll('<ul>', '').replaceAll('</li>', '').replaceAll('</ul>', '').replaceAll('<li>', '').replaceAll('<p>', '').replaceAll('</p>', '').replaceAll('<br>', '').replaceAll('</li><li>', '').replaceAll('<p>', '').replaceAll('</p>', '').replaceAll('</p><p>', '');
                responsibilitiesString += '.';
                if (responsibilitiesString <> null && responsibilitiesString <> '' && responsibilitiesString <> '.'){
                    finalKeyResponsibilities.add(responsibilitiesString);
                }
                responsibilitiesString = '';
            }
            projectMaps.put(Name, finalKeyResponsibilities);
            finalKeyResponsibilities = new List<String>();
        }
        return projectMaps;
    }

}