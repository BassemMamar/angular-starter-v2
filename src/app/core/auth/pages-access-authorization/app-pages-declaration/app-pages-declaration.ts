import { InvestigationPages } from './investigation.pages';
import { ManagementPages } from './business-account-management.pages';


export class FrontendShell {
    static Management = {
        Name: 'Management',
        Pages: ManagementPages
    };

    static Investigation = {
        Name: 'Investigation',
        Pages: InvestigationPages
    };

}

