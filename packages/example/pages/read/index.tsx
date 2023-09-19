import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import HeadTag from '@wireframe/components/HeadTag'
import Loader from '@wireframe/components/Loader'
import BasicCard from '@wireframe/components/cards/BasicCard'
import ContainerFilters from '@wireframe/components/layout/ContainerFilters'
import MaxWidthContainer from '@wireframe/components/layout/MaxWidthContainer'
import DualNaviLayout from '@wireframe/components/navi/DualNaviLayout'
import DropdownSimple from '@wireframe/components/tailwind/elements/DropdownSimple'
import Caption from '@wireframe/components/typography/Caption'
import H1 from '@wireframe/components/typography/H1'
import Heading from '@wireframe/components/typography/Heading'
import Superscript from '@wireframe/components/typography/Superscript'
import ReactMarkdown from 'react-markdown'
import { BOOKS } from '../../constants/books'
import { CHAPTERS } from '../../constants/chapters'
import { useQueryPassage } from '../../queries/passages'
import { useQueryProfile } from '../../queries/profile'
import { API_URL, navigation } from '../../settings'


const Home: NextPage = () => {
  const router = useRouter()

  const [verified, setVerified] = useState<boolean | null>(null)
  const [book, setBook] = useState<string>("Matthew")
  const [chapter, setChapter] = useState<number>(1)
  const [chapters, setChapters] = useState<string[]>([])
  const [hasParagraphs, setHasParagraphs] = useState<boolean>(false)
  const [paragraphs, setParagraphs] = useState<string[]>([])

  const { isLoading: isLoadingVerses, data: passage } = useQueryPassage(book, chapter)

  useEffect(() => {
    const book = router.query.book
    const chapter = router.query.chapter
    if (typeof book === "string") {
      if (BOOKS.includes(book)) {
        setBook(book)
      }
    }
    if (typeof chapter === "string") {
      setChapter(parseInt(chapter))
    }
    if (typeof book === "string") {
      if (BOOKS.includes(book)) {
        setBook(book)
      }
    }
  }, [router.query]);

  useEffect(() => {
    let chapters: string[] = []
    for (let i = 1; i <= CHAPTERS[book]; i++) {
      chapters.push(`Chapter ${i.toString()}`)
    }
    setChapters(chapters)
  }, [book]);

  useEffect(() => {
    const fetchData = async () => {
      const verified = await axios.post(`${API_URL}/auth/verify_token`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          }
        }).then((response) => {
          return response.data.success
        })

      setVerified(verified);
    }
    fetchData()
      .catch(console.error);
  }, []);

  useEffect(() => {
    const paragraphList: any = []
    let verseList: any = []
    if (passage) {
      passage?.verses.forEach((verse: any) => {
        if (verse.new_paragraph) {
          verseList.push(verse)
          paragraphList.push(verseList)
          verseList = []
        } else {
          verseList.push(verse)
        }
      })
      paragraphList.push(verseList)
      setParagraphs(paragraphList)
    }
  }, [passage, hasParagraphs]);

  const handleChangeBook = (value: string) => {
    setBook(value)
    setChapter(1)
    router.push({
      pathname: '/read',
      query: { ...router.query, book: value, chapter: 1 }
    },
      undefined,
      {}
    )
  }

  const handleChangeChapter = (value: string) => {
    const chapter = parseInt(value.replace("Chapter ", ""))
    setChapter(chapter)
    router.push({
      pathname: '/read',
      query: { ...router.query, chapter }
    },
      undefined,
      {}
    )
  }

  if (verified === null) return <Loader />

  return (
    <>
      <HeadTag title="Reader" description="Read a book" />
      <DualNaviLayout
        hideSidebar
        useQueryProfile={useQueryProfile}
        navigation={navigation}
        logo="/logo-white.png"
        isLoading={isLoadingVerses}
      >
        <MaxWidthContainer>
          <ContainerFilters>
            <DropdownSimple
              title="Select a Book"
              items={BOOKS}
              selectedValue={book}
              onChange={handleChangeBook}
            />
            <DropdownSimple
              title="Select a Chapter"
              items={chapters}
              selectedValue={`Chapter ${chapter}`}
              onChange={handleChangeChapter}
            />
          </ContainerFilters>

          <BasicCard className="mt-4">

            <H1>{book} {chapter}</H1>

            {(hasParagraphs) ? (
              <>
                {(paragraphs?.length > 0) && paragraphs.map((paragraph: any, i: number) => (
                  <div key={i} className="py-2">
                    {(paragraph.map((verse: any, i: number) => (
                      <span key={i}>
                        {(verse.title) && (
                          <Heading>{verse.title}</Heading>
                        )}
                        <span key={verse.id}>
                          <Superscript>{verse.verse_number}</Superscript>
                          {verse.text}
                          &nbsp;
                        </span>
                      </span>

                    )))}
                  </div>
                ))}
              </>
            ) : (
              <>
                {(passage?.verses?.length > 0) && passage?.verses.map((verse: any) => (
                  <p key={verse.id} className="py-2">
                    <Superscript>{verse.verse_number}</Superscript>
                    &nbsp;
                    {verse.text}
                  </p>
                ))}
              </>
            )}

            {(passage?.footnotes?.length > 0) && (
              <div className="mt-4">
                {(passage?.footnotes.map((footnote: any, i: number) => (
                  <Caption className="mt-1" key="i">
                    <ReactMarkdown>
                      {footnote}
                    </ReactMarkdown>
                  </Caption>
                )))}
              </div>
            )}
          </BasicCard>

        </MaxWidthContainer>

      </DualNaviLayout >
    </>
  )
}

export default Home
