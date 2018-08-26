import * as React from 'react';
import Helmet from 'react-helmet';

import './Layout.module.scss';

const Layout: React.SFC = ({ children }) => <>
    <Helmet>
        <title>babylon-practice</title>
    </Helmet>
    { children }
</>;

export default Layout;
