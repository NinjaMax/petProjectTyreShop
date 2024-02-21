import React from 'react';
import '../../css/SocialMedia/SocialMediaLinks.css';
import {
    ViberShareButton,
    TelegramShareButton,
    WhatsappShareButton, 
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton, 
    EmailShareButton,
    ViberIcon,
    WhatsappIcon,
    FacebookIcon,
    TelegramIcon,
    LinkedinIcon,
    EmailIcon,
    XIcon,
} from "react-share";

type SocialMediaTypes = {
    urlCurrent: string;
    hashtag: string;
    quoteLink: string;
};

const SocialMediaLinks = ({urlCurrent, hashtag, quoteLink}:SocialMediaTypes) => {
    return (
        <div className='socialLinks'>
            {urlCurrent && hashtag && quoteLink ?
            <>
            <ViberShareButton 
                url={urlCurrent} 
                title={quoteLink}
            >
                <ViberIcon size={45} round={true}/>
            </ViberShareButton>
            <TelegramShareButton 
                url={urlCurrent} 
                title={quoteLink}

            >
                <TelegramIcon size={45} round={true}/>
            </TelegramShareButton>
            <WhatsappShareButton 
                url={urlCurrent} 
                title={quoteLink}
                separator={hashtag}
            >
                <WhatsappIcon size={45} round={true}/>
            </WhatsappShareButton>
            <FacebookShareButton  
                url={urlCurrent} 
                title={quoteLink}
                hashtag={hashtag}
            >
                <FacebookIcon size={45} round={true}/>
            </FacebookShareButton>
            <TwitterShareButton 
                url={urlCurrent} 
                title={quoteLink}
                hashtags={hashtag.split('#')}
            >
                <XIcon size={45} round={true}/>
            </TwitterShareButton>
            <LinkedinShareButton 
                url={urlCurrent} 
                title={quoteLink}
            >
                <LinkedinIcon size={45} round={true}/>
            </LinkedinShareButton>
            <EmailShareButton 
                url={urlCurrent} 
                title={quoteLink}
            >
                <EmailIcon size={45} round={true}/>
            </EmailShareButton>
            </>
                : null
            }
        </div>
    );
};

export default SocialMediaLinks;