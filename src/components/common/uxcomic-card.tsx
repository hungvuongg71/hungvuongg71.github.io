import React, { useState } from 'react'
import UxComicDialog from './uxcomic-dialog'
import { Post } from '../../uxcomic-types'
import { getCoverPost, renderContent } from '../../helpers/content-helper'

interface IUxComicCardProps {
  posts: Post[]
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const UxComicCard: React.FC<React.PropsWithChildren<IUxComicCardProps>> = ({
  posts,
  onClick,
}) => {
  return (
    <>
      <div className="grid grid-cols-2 grid-flow-row auto-rows-max gap-2 w-full h-full px-6 pb-16">
        {posts.map((post) => (
          <div
            key={post.id}
            id={post.id}
            className="flex flex-col p-2 bg-white rounded-md shadow-[0px_1px_3px_0px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.3)]"
            onClick={onClick}
          >
            <div className="border border-solid border-uxcomic-divider rounded-sm">
              <div
                className="grow bg-cover bg-center h-40"
                style={{
                  backgroundImage: `url(${getCoverPost(post)?.data || post.cover})`,
                }}
              ></div>
              <div className="card-title-medium text-center border-t-[1px] pt-4 pb-2 px-2 relative">
                <div
                  className={`border border-solid border-x-uxcomic-divider rounded-full px-2 absolute top-[-14px] bg-white`}
                >
                  <span className="inline-block w-6 h-6">⚓</span>
                  <span className="inline-block w-6 h-6">⚓</span>
                  <span className="inline-block w-6 h-6">⚓</span>
                </div>
                {post.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default UxComicCard
