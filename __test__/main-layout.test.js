import React from 'react';
import { shallow, mount, render } from 'enzyme';

import MainLayout from '../app/transactional/layouts/main-layout.js';

describe('A suite', function() {
  it('should render without throwing an error', function() {
    expect(shallow(<MainLayout />).contains(<div id="footer"></div>)).toBe(true);
  });

  it('should be selectable by class "container-fluid"', function() {
    expect(shallow(<MainLayout />).is('.container-fluid')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<MainLayout />).find('.container-fluid').length).toBe(1);
  });

  it('should render to static HTML', function() {
    expect(render(<MainLayout />).text()).toEqual('Bar');
  });
});