import path from 'path'
import semver from 'semver'
import { extractChannelFromVersionString } from './FilenameHeuristics'

const REALEASE_CHANNEL : {[index:string] : number} = {
  dev: -1,
  ci: -1,
  alpha: 0,
  beta: 1,
  nightly: 2,
  production: 3,
  master: 4,
  release: 4,
}

export const compareVersions = (a : {version?:string, channel?: string}, b : {version?:string, channel?: string}) => {
  if(!('version' in a) || !a.version) return -1
  if(!('version' in b) || !b.version) return 1
  // don't let semver apply its "channel logic": 
  // coerce to apply custom channel logic on same versions (same before "-channel")
  let av = semver.coerce(a.version)
  let bv = semver.coerce(b.version)
  // @ts-ignore
  const semComp = semver.compare(bv, av)
  
  // try to set the channel based on version if it was not
  // explicitly set by repository (which is a good style)
  a.channel = a.channel || extractChannelFromVersionString(a.version)
  b.channel = b.channel || extractChannelFromVersionString(b.version)

  if(semComp === 0) {
    const channelA = REALEASE_CHANNEL[a.channel || ''] || -2
    const channelB = REALEASE_CHANNEL[b.channel || ''] || -2
    if(channelA > channelB) return -1
    if(channelB > channelA) return 1
    return 0
  }
  return semComp
}




