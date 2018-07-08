import { Autorun } from '../../ui/components/settings';
import { Calculator } from '../../ui/components/calculator';
import { Help } from '../../ui/components/help';
import { Profile } from '../../ui/components/profile';

export const general = {
  profile: {
    title: 'Profile',
    component: Profile,
    commandHint: '/profile'
  },
  calculator: {
    title: 'Calculator',
    component: Calculator,
    commandHint: '/calc {calculus}'
  },
  settings: {
    title: 'Settings',
    nested: {
      autorun: {
        title: 'Autorun',
        component: Autorun
      },
      advanced: {
        title: 'Advanced',
        nested: {
          logs: {
            title: 'Logs',
            component: Autorun
          }
        }
      }
    }
  }
};

export const footer = {
  help: {
    title: 'Help',
    component: Help
  }
};
