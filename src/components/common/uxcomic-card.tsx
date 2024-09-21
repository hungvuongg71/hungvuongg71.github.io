import * as React from 'react'

interface ICardProps {
  id?: string
  headerTitle?: string
  footerTitle?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const UxComicCard: React.FC<React.PropsWithChildren<ICardProps>> = ({
  id,
  headerTitle,
  footerTitle,
  onClick,
  children,
}) => {
  return (
    <div id={id} onClick={onClick} className="flex flex-col bg-neutral-200 p-2">
      {headerTitle && <div className="">Header</div>}
      <div className="grow">{children || 'No Content'}</div>
      {footerTitle && <div className="">Footer</div>}
    </div>
  )
}

export default UxComicCard
