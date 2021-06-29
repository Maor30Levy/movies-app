import React from 'react';
import FooterIcon from './FooterIcon';

export default function Footer() {
    return (
        <div className="footer__container">
            <div className="footer">
                <FooterIcon name={"Movies"} />
                <FooterIcon name={"Theaters"} />
                <FooterIcon name={"News"} />
                <FooterIcon name={"Account"} />
            </div>

        </div>
    )
}
