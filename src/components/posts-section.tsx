import React, { useState, JSX } from 'react'
import { Post } from '../services/uxcomic-service'
import { UxComicFlashCard } from './common'
import { ContentList } from '../pages'
import { useUxComicFlashCard } from '../hooks'

interface IPostsSectionProps {
  posts: Post[]
  contentList: ContentList[]
}

const PostsSection: React.FC<React.PropsWithChildren<IPostsSectionProps>> = ({
  posts,
  contentList,
  children,
}) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [contentElements, setContentElements] = useState<JSX.Element[]>([])
  const { props, bind, trans, enableDrag } = useUxComicFlashCard(posts)

  // const handleGoToContent = async (event: React.MouseEvent<HTMLDivElement>) => {
  //   const contentResults =
  //     contentList.find((item) => item.id === event.currentTarget.id)
  //       ?.contents || []
  //   const tmpContentElement: JSX.Element[] = []
  //   contentResults.forEach((content) => {
  //     const tmp = renderContent(content)
  //     if (tmp !== null) tmpContentElement.push(tmp)
  //   })
  //   setContentElements(tmpContentElement)
  //   setOpenDialog(true)
  // }

  return (
    <div className="flex items-center justify-center h-full">
      <>
        {props.map(({ x, y, rot, scale }, i) => (
          <UxComicFlashCard
            key={i}
            i={i}
            x={x}
            y={y}
            rot={rot}
            scale={scale}
            imageUrl={posts[i].cover}
            title={posts[i].title}
            bind={bind}
            trans={trans}
            onEnableDrag={enableDrag}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec
              efficitur orci. Vivamus fermentum viverra sapien, eu laoreet erat
              fermentum vel. Integer vestibulum augue purus, ut auctor est
              imperdiet quis. Vestibulum dictum bibendum ante nec luctus. Sed a
              porttitor eros. Ut mollis metus vitae nisi vestibulum, eu posuere
              libero luctus. In risus lacus, faucibus ut neque non, tempus
              imperdiet quam. Fusce tortor diam, venenatis non pharetra nec,
              venenatis sed diam. Donec ut rhoncus elit. Quisque bibendum mauris
              eu convallis ornare. Nunc elementum est ex, mollis dapibus eros
              pretium nec.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec
              efficitur orci. Vivamus fermentum viverra sapien, eu laoreet erat
              fermentum vel. Integer vestibulum augue purus, ut auctor est
              imperdiet quis. Vestibulum dictum bibendum ante nec luctus. Sed a
              porttitor eros. Ut mollis metus vitae nisi vestibulum, eu posuere
              libero luctus. In risus lacus, faucibus ut neque non, tempus
              imperdiet quam. Fusce tortor diam, venenatis non pharetra nec,
              venenatis sed diam. Donec ut rhoncus elit. Quisque bibendum mauris
              eu convallis ornare. Nunc elementum est ex, mollis dapibus eros
              pretium nec.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec
              efficitur orci. Vivamus fermentum viverra sapien, eu laoreet erat
              fermentum vel. Integer vestibulum augue purus, ut auctor est
              imperdiet quis. Vestibulum dictum bibendum ante nec luctus. Sed a
              porttitor eros. Ut mollis metus vitae nisi vestibulum, eu posuere
              libero luctus. In risus lacus, faucibus ut neque non, tempus
              imperdiet quam. Fusce tortor diam, venenatis non pharetra nec,
              venenatis sed diam. Donec ut rhoncus elit. Quisque bibendum mauris
              eu convallis ornare. Nunc elementum est ex, mollis dapibus eros
              pretium nec.
            </p>
            {/* <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec
              efficitur orci. Vivamus fermentum viverra sapien, eu laoreet erat
              fermentum vel. Integer vestibulum augue purus, ut auctor est
              imperdiet quis. Vestibulum dictum bibendum ante nec luctus. Sed a
              porttitor eros. Ut mollis metus vitae nisi vestibulum, eu posuere
              libero luctus. In risus lacus, faucibus ut neque non, tempus
              imperdiet quam. Fusce tortor diam, venenatis non pharetra nec,
              venenatis sed diam. Donec ut rhoncus elit. Quisque bibendum mauris
              eu convallis ornare. Nunc elementum est ex, mollis dapibus eros
              pretium nec.
            </p>
            <p>
              In a lectus nec est convallis tempus. Curabitur leo sapien,
              vestibulum et rhoncus at, congue vitae eros. Cras aliquet
              vulputate quam, nec ornare ligula. Pellentesque bibendum lacinia
              mi, sed dapibus libero placerat et. Suspendisse quis magna nec
              enim volutpat accumsan. Maecenas ut ligula accumsan, feugiat elit
              sit amet, pharetra tellus. Curabitur laoreet tempus metus, nec
              suscipit quam ornare id. Nam ornare erat odio, ut tincidunt justo
              auctor nec. Nullam vitae ante non dolor pellentesque mollis vel at
              dui. Morbi nec viverra nisl, vel iaculis dolor.
            </p>
            <p>
              Nunc faucibus molestie interdum. Morbi id posuere dolor.
              Vestibulum eu suscipit libero. Nulla facilisis fermentum tellus,
              ac scelerisque nisl maximus id. Morbi in luctus lacus. Vivamus id
              mauris ex. Fusce scelerisque augue lectus, nec tempor nulla
              dignissim sit amet. Sed ullamcorper vestibulum vulputate. Mauris
              viverra non quam ac consequat. Morbi elit arcu, aliquet in sodales
              sit amet, sollicitudin tempor mi.
            </p>
            <p>
              Cras eget commodo ante. Etiam et neque nisi. Nullam semper
              accumsan sollicitudin. Cras vel accumsan tellus. Nullam interdum,
              nunc quis semper aliquet, lacus libero elementum magna, nec tempor
              ante orci porta est. Suspendisse ullamcorper scelerisque urna sit
              amet tempor. Pellentesque magna velit, viverra eu laoreet et,
              tempor maximus lectus. Curabitur vulputate pretium diam, vel
              dictum risus euismod egestas. Suspendisse imperdiet ante ac lectus
              aliquet mattis. Cras consequat placerat nisi, ac molestie tortor
              fringilla nec. Suspendisse potenti.
            </p>
            <p>
              Etiam eleifend vel enim sed sollicitudin. In euismod lorem ac
              purus ultrices, at venenatis justo gravida. Nunc blandit at tellus
              in vulputate. Donec luctus lacus neque, in bibendum erat ornare
              non. Etiam venenatis dolor faucibus viverra cursus. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Pellentesque nunc
              lectus, tristique eget sodales non, mattis et urna. Nulla lacinia
              sit amet leo in ullamcorper.
            </p> */}
          </UxComicFlashCard>
        ))}
      </>
    </div>
  )
}

export default PostsSection
