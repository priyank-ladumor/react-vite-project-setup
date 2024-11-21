import PropTypes from 'prop-types';
import { paths } from '@/routes/paths.js';
const Layout = ({ children }) => {
    return (
        <div className="layout">
            {![paths.home.root, paths.form.root].includes(window.location.pathname) &&
                <header className="header">
                    <center> <h1>Header</h1> </center>
                </header>
            }

            <div className="main-container">
                <main className="content">
                    {children}
                </main>
            </div>

            {![paths.form.root].includes(window.location.pathname) &&
                <footer className="footer">
                    <center> <h1>Footer</h1> </center>
                </footer>
            }
        </div>
    );
};

export default Layout;

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};