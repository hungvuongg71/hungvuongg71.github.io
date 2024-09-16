import * as React from 'react'

interface ICardProps {
    headerTitle?: string;
    footerTitle?: string;
}

const Card: React.FC<React.PropsWithChildren<ICardProps>> = ({ headerTitle, footerTitle, children }) => {
    return (
        <div className="flex flex-col h-48 bg-neutral-200 p-2">
            {headerTitle &&
                <div className="">
                    Header
                </div>
            }

            <div className="grow">
                {children || 'No Content'}
            </div>

            {footerTitle &&
                <div className="">
                    Footer
                </div>
            }
        </div>
    )
}

export default Card