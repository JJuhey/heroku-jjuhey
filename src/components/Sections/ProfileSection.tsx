import { Chip, Link } from '@material-ui/core'
import React from 'react'

import styles from './ProfileSection.module.scss'

import { dummyInfo } from './dummy'

interface PropsType {
  information?: DumType;
}

interface DumType {
  educations: any[];
  careers: any[];
  certifications: any[];
  repository: string;
  download: string;
}


const ProfileSection: React.FC<PropsType> = ({ information = dummyInfo }: PropsType) => {
  return (
    <div>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.label}>NAME</td>
            <td>최 주 혜 (JUHYE CHOI, JJUHEY, JENNA)</td>
          </tr>
          <tr>
            <td className={styles.label}>EMAIL</td>
            <td>dallicjh@gmail.com</td>
          </tr>
          <tr>
            <td className={styles.label}>ROLE</td>
            <td>Web Developer, Software Engineer and Youtube Creator</td>
          </tr>
          <tr>
            <td className={styles.label}>SKILLS</td>
            <td>
              <div className={styles.skills}>
                <Chip label='Javascript' />
                <Chip label='Typescript' />
                <Chip label='Nodejs' />
                <Chip label='React'/>
                <Chip label='Redux'/>
                <Chip label='MongoDB'/>
                <Chip label='Java'/>
                <Chip label='Spring'/>
                <Chip label='RDBMS'/>
                <Chip label='HTML5'/>
                <Chip label='CSS3'/>
                <Chip label='Git'/>
                <Chip label='Github'/>
              </div>
            </td>
          </tr>
          <tr>
            <td className={styles.label}>OTHERS</td>
            <td>
              <div className={styles.skills}>
                <Chip label='UGNX'/>
                <Chip label='CATIA'/>
                <Chip label='INVENTOR'/>
                <Chip label='AutoCAD'/>
                <Chip label='FinalCut'/>
                <Chip label='PhotoShop'/>
              </div>
            </td>
          </tr>
          {!information && <tr>
            <td colSpan={2}>
              <div className={styles.warning}>
                <div>If you want more information</div>
                <Link href='/login'>SIGN IN</Link>
                <div>업데이트 중입니다. 조금만 기다려주세요.</div>
              </div>
            </td>
          </tr>}
          {information.certifications && <tr>
            <td className={styles.label}>CERTIFICATIONS</td>
            <td className={styles.contents}>
              {information.certifications.map(cert => <div>{cert.name} ({cert.date})</div>)}
            </td>
          </tr>}
          {information.educations && <tr>
            <td className={styles.label}>EDUCATIONS</td>
            <td className={styles.contents}>
              {information.educations.map(edu => <div>{edu.name} ({edu.start} ~ {edu.end}) | {edu.description}</div>)}
            </td>
          </tr>}
          {information.careers && <tr>
            <td className={styles.label}>CAREERS</td>
            <td className={styles.contents}>
              {information.careers.map(car => <div>{car.name} ({car.start} ~ {car.end}) | {car.description}</div>)}
            </td>
          </tr>}
          {information.repository && <tr>
            <td className={styles.label}>REPOSITORY</td>
            <td><Link href={information.repository}>{information.repository}</Link></td>
          </tr>}
          {information.download && <tr>
            <td className={styles.label}>PORTFOLIO FILE</td>
            <td>{information.download}</td>
          </tr>}
        </tbody>
      </table>
    </div>
  )
}

export default ProfileSection
