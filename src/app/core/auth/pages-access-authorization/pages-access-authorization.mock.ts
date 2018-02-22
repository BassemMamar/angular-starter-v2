import { FrontendShell } from './app-pages-declaration/app-pages-declaration';
import { UserRole, AccessLevel } from '../model/user-roles.enum';

export const pagesAccessAuthorizationInfo = [
    // BusinessAccountManagement module
    {
        name: FrontendShell.BusinessAccountManagement.Name,
        rolesAccess: [
            { role: UserRole.BusinessAccountManager, accessLevel: AccessLevel.FullAccess }
        ],
        pages: [
            {
                name: FrontendShell.BusinessAccountManagement.Pages.ListBusiness,
                rolesAccess: [
                    { role: UserRole.BusinessAccountManager, accessLevel: AccessLevel.FullAccess }
                ]
            },
            {
                name: FrontendShell.BusinessAccountManagement.Pages.EditBusiness,
                rolesAccess: [
                    { role: UserRole.BusinessAccountManager, accessLevel: AccessLevel.FullAccess }
                ]
            }
        ]
    },

    // Investigation module
    {
        name: FrontendShell.InvestigationStudio.Name,
        rolesAccess: [
            { role: UserRole.Investigator, accessLevel: AccessLevel.FullAccess }
        ],
        pages: [
            {
                name: FrontendShell.InvestigationStudio.Pages.RecentJourneys,
                rolesAccess: [
                    { role: UserRole.Investigator, accessLevel: AccessLevel.ReadOnly },
                ]
            }
        ]
    }

];
