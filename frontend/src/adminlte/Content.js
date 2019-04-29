import React from "react";


class Content extends React.Component {
    render() {
        // const {children} = this.props;
        const children = React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                updateImportCountries: this.props.updateImportCountries,
            });
        });
        return (
            <section className="content">
                {children}
            </section>
        );
    }
}

export default Content;
