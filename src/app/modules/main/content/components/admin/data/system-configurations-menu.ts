import { ClientsConfigurationComponent } from "../child-components/system-configurations/clients-configuration/clients-configuration.component";
import { DomainsConfigurationComponent } from "../child-components/system-configurations/domains-configuration/domains-configuration.component";
import { MembersConfigurationComponent } from "../child-components/system-configurations/members-configuration/members-configuration.component";
import { ProjectsConfigurationComponent } from "../child-components/system-configurations/projects-configuration/projects-configuration.component";
import { ReleasesConfigurationComponent } from "../child-components/system-configurations/releases-configuration/releases-configuration.component";

export const systemConfigurationsMenu = [
    {
        title: 'Members',
        component: MembersConfigurationComponent
    },
    {
        title: 'Clients',
        component: ClientsConfigurationComponent
    },
    {
        title: 'Projects',
        component: ProjectsConfigurationComponent
    },
    {
        title: 'Releases',
        component: ReleasesConfigurationComponent
    },
    {
        title: 'Domains',
        component: DomainsConfigurationComponent
    },
    // {
    //     title: 'Timelines',
    //     component: MembersConfigurationComponent
    // }
];