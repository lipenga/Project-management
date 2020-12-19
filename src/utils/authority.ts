import { reloadAuthorized } from './Authorized';
import { NorthIsLandObj } from '@/TypeConstant/stroge'
// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? JSON.parse(localStorage.getItem('NorthIsLandObj') || '{}')?.authority : str;
  // authorityString could be admin, "admin", ["admin"]

  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));

  // auto reload
  reloadAuthorized();
}
