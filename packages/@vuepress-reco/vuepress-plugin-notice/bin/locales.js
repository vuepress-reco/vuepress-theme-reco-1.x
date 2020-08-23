const zhHans = {
  notice: '公告'
}

const zhHant = {
  notice: '公告'
}

const en = {
  notice: 'Notice'
}

const ja = {
  notice: '公告'
}

const ko = {
  notice: '공고'
}

export default function noticeLocales (ctx) {
  const { $lang, $recoLocales: { pagation } = {} } = ctx
  if (pagation) {
    return pagation
  }
  if (/^zh\-(CN|SG)$/.test($lang)) {
    return zhHans
  }
  if (/^zh\-(HK|MO|TW)$/.test($lang)) {
    return zhHant
  }
  if (/^ja\-JP$/.test($lang)) {
    return ja
  }
  if (/^ko\-KR$/.test($lang)) {
    return ko
  }
  return en
}
