import { FrontendShell } from './app-pages-declaration/app-pages-declaration';
import { UserRole, AccessLevel } from '../model/user-roles.enum';

export const pagesAccessAuthorizationInfo = [
    // Management module
    {
        name: FrontendShell.Management.Name,
        rolesAccess: [
            { role: UserRole.Manager, accessLevel: AccessLevel.FullAccess }
        ],
        pages: [
            {
                name: FrontendShell.Management.Pages.ListBusiness,
                rolesAccess: [
                    { role: UserRole.Manager, accessLevel: AccessLevel.FullAccess }
                ]
            },
            {
                name: FrontendShell.Management.Pages.EditBusiness,
                rolesAccess: [
                    { role: UserRole.Manager, accessLevel: AccessLevel.FullAccess }
                ]
            }
        ]
    },

    // Investigation module
    {
        name: FrontendShell.Investigation.Name,
        rolesAccess: [
            { role: UserRole.Investigator, accessLevel: AccessLevel.FullAccess }
        ],
        pages: [
            {
                name: FrontendShell.Investigation.Pages.RecentJourneys,
                rolesAccess: [
                    { role: UserRole.Investigator, accessLevel: AccessLevel.ReadOnly },
                ]
            }
        ]
    }

];
