import Vue from 'vue'
import 'vant/lib/index.css';
import { Swipe, SwipeItem , Lazyload , Form , Field , Button
,GoodsAction, GoodsActionIcon, GoodsActionButton,
  Tab, Tabs ,Sidebar, SidebarItem , Collapse, CollapseItem,
  Card ,Badge , Checkbox, CheckboxGroup , Cell , CellGroup
   , Stepper ,SwipeCell ,SubmitBar , Icon ,AddressList ,AddressEdit } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(GoodsAction);
Vue.use(GoodsActionIcon);
Vue.use(GoodsActionButton);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Card);
Vue.use(Badge );
Vue.use(Checkbox );
Vue.use(CheckboxGroup );
Vue.use(Cell );
Vue.use(CellGroup );
Vue.use(Stepper );
Vue.use(SwipeCell);
Vue.use(SubmitBar);
Vue.use(Icon );
Vue.use(AddressList  );
Vue.use(AddressEdit  );



Vue.use(Lazyload , {
  loading:require('../../../assets/images/default.png')
})