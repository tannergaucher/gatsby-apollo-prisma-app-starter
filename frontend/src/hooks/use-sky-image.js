import { useStaticQuery, graphql } from "gatsby"

export const useSkyImage = () => {
  const { file } = useStaticQuery(
    graphql`
      query SkyImage {
        file(relativePath: { regex: "/sky/" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )
  return file
}
