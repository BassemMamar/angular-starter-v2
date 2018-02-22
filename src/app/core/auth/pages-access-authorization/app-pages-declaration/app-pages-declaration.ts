import { InvestigationStudioPages } from './investigation.pages';
import { BusinessAccountManagementPages } from './business-account-management.pages';


export class FrontendShell {
    static BusinessAccountManagement = {
        Name: 'BusinessAccountManagement',
        Pages: BusinessAccountManagementPages
    };

    static InvestigationStudio = {
        Name: 'InvestigationStudio',
        Pages: InvestigationStudioPages
    };

}

