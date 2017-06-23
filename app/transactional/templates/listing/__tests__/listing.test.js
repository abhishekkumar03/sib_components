import React from 'react';
import { expect } from 'chai';
import { render } from 'enzyme';

import Listing from '../listing.js';

describe('<Listing />', () => {
  it('renders checkbox `.selectall` with value `all`', () => {
    const wrapper = render(<Listing />);
    expect(wrapper.find('.selectall').value).to.equal('all');
  });

  it('renders the button `.archive_all`', () => {
    const wrapper = render(<Listing />);
    expect(wrapper.find('.archive_all').text()).to.contain('<i className="fa fa-file-archive-o"></i>Archive');
  });
});