import React from 'react';
import { shallow, mount, render } from 'enzyme';
import App from './App';
import Header from './GlobalHeader';
import WeatherNow from './WeatherNow';
import Footer from './GlobalFooter';

describe('<App />', () => {
    it('renders without crashing', () => {
      shallow(<App />);
    });

    it('renders <Header />', () => {
      const wrapper = shallow(<App />);
      //console.log(wrapper);
      expect(wrapper.find(Header).length).toBeGreaterThan(0);
    });

    it('renders <WeatherNow />', () => {
      const wrapper = shallow(<App />);
      //console.log(wrapper);
      expect(wrapper.find(WeatherNow).length).toBeGreaterThan(0);
    });
    it('shows correct copyright year', () => {
      const currYear = new Date().getFullYear().toString();
      const copyrightYearElement = shallow(<Footer />).find("#GlobalFooterCopyrightYear");
      console.log(copyrightYearElement);
      expect(copyrightYearElement.text()).toEqual(currYear);

    });
    it('shows correct copyright message', () => {
      const currYear = new Date().getFullYear().toString();
      const copy = '\u00A9'; //&copy;
      const copyright = `${copy} 2017-${currYear} Home Weather. All rights reserved.`;
      const copyrightElement = shallow(<Footer />).find("#GlobalFooterCopyright");
      //console.log(copyrightElement);
      expect(copyrightElement.text()).toEqual(copyright);

    });

});
