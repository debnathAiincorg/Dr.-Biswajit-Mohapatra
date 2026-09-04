/*
 * The external-proof registry.
 *
 * Every outbound URL on this site is declared here and nowhere else. Two
 * reasons it is a registry rather than a field written inline on each row:
 *
 *   - several records prove more than one claim (the Thinkers360 badges back
 *     one Awards row between them; the IBM "Plateau" badge backs an award and
 *     a patent), so the URL would otherwise be written twice and drift;
 *   - scripts/check-links.mjs walks this object. A URL that is not here is
 *     never checked, and a URL that fails the check must not ship.
 *
 * Nothing enters this file until it has been fetched and its content confirmed
 * to be about Dr. Biswajit Mohapatra specifically. `Biswajit Mohapatra` is a
 * common name -- the English Wikipedia article under that exact name is an
 * Odia playback singer born in 1992, and is not him. See the design spec,
 * "The governing rule: nothing ships unverified".
 */

export interface Source {
  /** How a reader would name the destination, e.g. "Google Patents". */
  readonly label: string;
  readonly url: string;
  /** Groups the entry in the Sources aside and picks its glyph. */
  readonly kind: 'patent' | 'credential' | 'press' | 'organisation' | 'article' | 'event';
}

/*
 * Credential badges.
 *
 * The "Licenses & certifications" section of dr/linkdin3.docx is thirteen bare
 * hyperlinks and *no names at all* -- whoever pasted the LinkedIn page into
 * Word kept the "Show credential" anchors and lost every title, issuer and
 * date. So each name below comes from resolving the badge itself (Credly's
 * OpenBadges assertion + badge_class, Oracle's certview page), not from the
 * document.
 *
 * Credly URLs use the /public_url form. The document had a mixture of
 * /linked_in_profile and ?source=linked_in_profile; all three resolve, but
 * only /public_url is the canonical shareable address rather than a
 * referral-tagged one.
 */
export const sources = {
  azureSolutionsArchitect: {
    label: 'Credly badge (expired 2023)',
    url: 'https://www.credly.com/badges/ac10fd00-ee4d-4f52-83e4-cf5d977ff0af/public_url',
    kind: 'credential',
  },
  azureAz300: {
    label: 'Credly badge',
    url: 'https://www.credly.com/badges/e8f5e555-eaac-4c97-b9b4-77fe369cedd8/public_url',
    kind: 'credential',
  },
  azureAz301: {
    label: 'Credly badge',
    url: 'https://www.credly.com/badges/2b389902-a1e1-4276-81ea-be423fd31623/public_url',
    kind: 'credential',
  },
  ibmCloudPak: {
    label: 'Credly badge',
    url: 'https://www.credly.com/badges/b9d00b68-1684-43a1-b9fd-fde55d48a588/public_url',
    kind: 'credential',
  },
  ibmLicenseToLead: {
    label: 'Credly badge (expired 2024)',
    url: 'https://www.credly.com/badges/a2311e84-b072-44e0-88f6-e46af77b069b/public_url',
    kind: 'credential',
  },
  ibmKnowledgeSharing: {
    label: 'Credly badge',
    url: 'https://www.credly.com/badges/e9ac9827-55e0-4dc8-a1e8-58ca48dee61b/public_url',
    kind: 'credential',
  },
  ibmBeEqualAlly: {
    label: 'Credly badge',
    url: 'https://www.credly.com/badges/6807a0b9-e7f2-4271-a5a2-26c4629c2882/public_url',
    kind: 'credential',
  },
  /* Tagged Inventor / Patenting / Technical Publishing by IBM. It is the
     badge behind the Second Plateau Invention Achievement Award, so it is
     cited from Awards rather than listed as a certification. */
  ibmPlateau: {
    label: 'Credly badge',
    url: 'https://www.credly.com/badges/d3d5fb42-5519-4ff6-a41a-a9fefdad3217/public_url',
    kind: 'credential',
  },
  oracleArchitectAssociate: {
    label: 'Oracle CertView',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=06D04A63FBF74A2D2190E18FFBEA18F6314F836F4234312DCFCA1283E0EB3EB4',
    kind: 'credential',
  },
  oracleFoundationsAssociate: {
    label: 'Oracle CertView',
    url: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=5AA5876AC91E92A892AEF12649ACA76C445D0420BD5B1D04A81E65770F15AB5D',
    kind: 'credential',
  },

  /* Thinkers360 rankings are recognition, not certifications, so they back the
     Awards row rather than appearing on Certifications. Three separate badges,
     one per category, matching the row's "Cloud, Data Center and DevOps". */
  thinkers360Cloud: {
    label: 'Thinkers360 — Cloud',
    url: 'https://www.thinkers360.com/tl/badge/4915/5422',
    kind: 'credential',
  },
  thinkers360DataCenter: {
    label: 'Thinkers360 — Data Center',
    url: 'https://www.thinkers360.com/tl/badge/4915/5424',
    kind: 'credential',
  },
  thinkers360DevOps: {
    label: 'Thinkers360 — DevOps',
    url: 'https://www.thinkers360.com/tl/badge/4915/5425',
    kind: 'credential',
  },

  /* The one "Show project" link in dr/linkdin3.docx's Projects section, on
     AWS's own YouTube channel. Fetched directly (not just checked for a
     200) to confirm the page names him, not merely a title match. */
  awsCapabilityDevVideo: {
    label: 'IBM Discusses the Value of AWS Training and Certification',
    url: 'https://www.youtube.com/watch?v=1wy40pRRbLk',
    kind: 'article',
  },

  /* dr/linkdin3.docx's "Licenses & certifications" section carries 15
     hyperlinks, not the 13 originally resolved into this registry -- two
     credential.net (Accredible) links were missed on the first pass. */
  gremlinChaosEngineering: {
    label: 'Accredible credential',
    url: 'https://www.credential.net/1e074e40-8d9f-46ba-b3bb-f9c2c8fdc60c',
    kind: 'credential',
  },
  /* The second missed link: a digital Accredible copy of the same Catalyst
     Technology Award already proven on Awards by its physical certificate
     photo. Cited from that row as a second, independent verification. */
  catalystAward2021Accredible: {
    label: 'Accredible credential',
    url: 'https://www.credential.net/6275c752-8b94-4b68-81e6-2a20a5575be0',
    kind: 'credential',
  },
} as const satisfies Record<string, Source>;

export type SourceKey = keyof typeof sources;
