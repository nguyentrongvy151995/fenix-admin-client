import { lazy } from 'react';
import AddMatchSetting from 'src/pages/MatchSettings/AddMatchSetting';
import DetailMatchSetting from 'src/pages/MatchSettings/DetailMatchSetting';
import ListMatchSetting from 'src/pages/MatchSettings/ListMatchSetting';
import RankTier from 'src/pages/RankTiers';
import AddRankTier from 'src/pages/RankTiers/Add';
import RankTierDetail from 'src/pages/RankTiers/detail';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));

const coreRoutes: any[] = [
  {
    path: '/rank-tiers',
    title: 'RankTier',
    component: RankTier,
  },
  {
    path: '/rank-tiers/:id',
    title: 'RankTierDetail',
    component: RankTierDetail,
  },
  {
    path: '/rank-tiers/add',
    title: 'RankTierAdd',
    component: AddRankTier,
  },
  {
    path: '/match-settings',
    title: 'MatchSetting',
    component: ListMatchSetting,
  },
  {
    path: '/match-settings/add',
    title: 'MatchSetting',
    component: AddMatchSetting,
  },
  {
    path: '/match-settings/:id',
    title: 'MatchSetting',
    component: DetailMatchSetting,
  },
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
