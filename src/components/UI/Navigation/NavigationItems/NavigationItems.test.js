import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';


configure({adapter: new Adapter()})

describe('<NavigationItems />', ()=> {
    it('Should render one <NavigationItem /> elements if not authenticated',()=>{
            const wrapper = shallow(<NavigationItems />)
            expect(wrapper.find(NavigationItem)).toHaveLength(1)
    })
    it('Should render one <NavigationItem /> elements if  authenticated',()=>{
        const wrapper = shallow(<NavigationItems />)
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
})
it('Should contain <NavigationItem /> elements if authenticated',()=>{
    const wrapper = shallow(<NavigationItems isAuth />)
    expect(wrapper.contains(<NavigationItem link="/logout" >Logout</NavigationItem>)).toEqual(true)
})
})