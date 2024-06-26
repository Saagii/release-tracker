import { ReleaseCompatibilityInteroperabilityComponent } from "../components/release-view/child-components/compatibility-interoperability/compatibility-interoperability.component";
import { ReleaseDefectsBugsObservationsComponent } from "../components/release-view/child-components/defects-bugs-observations/defects-bugs-observations.component";
import { ReleaseDeploymentPlanComponent } from "../components/release-view/child-components/deployment-plan/deployment-plan.component";
import { ReleaseEnhancementsInnovationsComponent } from "../components/release-view/child-components/enhancements-innovations/enhancements-innovations.component";
import { ReleaseLocalizationInternalizationComponent } from "../components/release-view/child-components/localization-internalization/localization-internalization.component";
import { ReleaseObjectivesComponent } from "../components/release-view/child-components/objectives/objectives.component";
import { ReleasePerformanceOptimizationComponent } from "../components/release-view/child-components/performance-optimization/performance-optimization.component";
import { ReleaseRollbackPlansComponent } from "../components/release-view/child-components/rollback-plan/rollback-plan.component";
import { ReleaseSecurityDisclosureComponent } from "../components/release-view/child-components/security-disclosure/security-disclosure.component";
import { ReleaseUsabilityComponent } from "../components/release-view/child-components/usability/usability.component";
import { ReleaseUserSupportComponent } from "../components/release-view/child-components/user-support/user-support.component";
import { ReleaseVersionControlComponent } from "../components/release-view/child-components/version-control/version-control.component";

export const releaseAdvancedDetailsMenu = [
    {
        id: 1,
        title: 'Objectives',
        description: 'List the specific goals and objectives that this release is intended to achieve',
        icon: '',
        isActive: true,
        identifierName: 'releaseObjectives',
        component: ReleaseObjectivesComponent
    },
    {
        id: 2,
        title: 'Enhancements & Innovations',
        description: 'Improvements or enhancements made to existing features, processes, or systems.',
        icon: '',
        isActive: true,
        identifierName: 'releaseEnhancements',
        component: ReleaseEnhancementsInnovationsComponent
    },
    {
        id: 3,
        title: 'Defects, Bugs & Observations',
        description: 'List and describe issues or bugs that were addressed and resolved in this release.',
        icon: '',
        isActive: true,
        identifierName: 'releaseDefects',
        component: ReleaseDefectsBugsObservationsComponent
    },
    {
        id: 4,
        title: 'Compatibility and Interoperability',
        description: 'Objectives to ensure the software is compatible with various platforms, devices, browsers, OS.',
        icon: '',
        isActive: true,
        identifierName: 'releaseCompatibility',
        component: ReleaseCompatibilityInteroperabilityComponent
    },
    {
        id: 5,
        title: 'Usability',
        description: 'Objectives aimed at improving the overall user interface, user experience (UX), user-friendlyness, being intuitive, and meets the needs of its intended users of the software.',
        icon: '',
        isActive: true,
        identifierName: 'releaseUsability',
        component: ReleaseUsabilityComponent
    },
    {
        id: 6,
        title: 'Compliance & Regulatory Approvals',
        description: 'Objectives focused on ensuring compliance with data privacy regulations and industry-specific standards.',
        icon: '',
        isActive: false,
        identifierName: 'releaseCompliance',
        component: ''
    },
    {
        id: 7,
        title: 'Localization and Internationalization',
        description: 'Objectives to make the software available in multiple languages and adapt it to different regions and cultures.',
        icon: '',
        isActive: true,
        identifierName: 'releaseLocalization',
        component: ReleaseLocalizationInternalizationComponent
    },
    {
        id: 8,
        title: 'Rollback Plan',
        description: 'A rollback plan helps in tracking and reverting the process in case any critical issues arise post-deployment.',
        icon: '',
        isActive: true,
        identifierName: 'releaseRollbackPlan',
        component: ReleaseRollbackPlansComponent
    },
    {
        id: 9,
        title: 'Performance Optimization',
        description: 'project release performance strategy involves careful planning, coordination, and execution to ensure that the release meets stakeholder expectations while maintaining quality and efficiency.',
        icon: '',
        isActive: true,
        identifierName: 'releasePerformanceStrategy',
        component: ReleasePerformanceOptimizationComponent
    },
    {
        id: 10,
        title: 'Deployment Strategy',
        description: 'Plan how the release will be deployed, considering the timing and method of distribution. This may include phased or staged rollouts.',
        icon: '',
        isActive: true,
        identifierName: 'releaseDeploymentStrategy',
        component: ReleaseDeploymentPlanComponent
    },
    {
        id: 11,
        title: 'Version Control',
        description: 'Ensure that patch releases are well-managed in terms of version control, so users can easily identify the changes made in the patch.',
        icon: '',
        isActive: true,
        identifierName: 'releaseVersionControl',
        component: ReleaseVersionControlComponent
    },
    {
        id: 12,
        title: 'User Support',
        description: 'Providing support to users who may encounter issues related to the patch or need assistance with its installation.',
        icon: '',
        isActive: true,
        identifierName: 'releaseUserSupport',
        component: ReleaseUserSupportComponent
    },
    {
        id: 13,
        title: 'Security Disclosure',
        description: 'Crucial to capture comprehensive details to ensure clarity, transparency, and effective resolution',
        icon: '',
        isActive: true,
        identifierName: 'releaseSecurityDisclosure',
        component: ReleaseSecurityDisclosureComponent
    }
]