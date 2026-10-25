export type ViewMode = 'hidden' | 'lines' | 'full';

export const LINE_HEIGHT = 24;
export const BODY_PADDING = 32;
export const TRUNCATION_HINT_HEIGHT = 12;

export function lineCount(lines: number | undefined): number | undefined {
  if (lines == null || lines === 0) return undefined;
  return Math.abs(lines);
}

export function initialViewMode(lines: number | undefined): ViewMode {
  if (lines === 0) return 'hidden';
  if (lines != null) return 'lines';
  return 'full';
}

export function showBodyContent(viewMode: ViewMode, hasContent: boolean): boolean {
  return hasContent && viewMode !== 'hidden';
}

export function effectiveLineLimit(viewMode: ViewMode, lines: number | undefined): number | undefined {
  if (viewMode !== 'lines') return undefined;
  return lineCount(lines);
}

export function hasTruncatedLines(viewMode: ViewMode, lines: number | undefined, totalLines: number): boolean {
  const limit = effectiveLineLimit(viewMode, lines);
  return limit != null && limit > 0 && totalLines > limit;
}

export function displayHeight(limit: number | undefined): string | undefined {
  if (limit == null || limit <= 0) return undefined;
  return `${limit * LINE_HEIGHT + BODY_PADDING + TRUNCATION_HINT_HEIGHT}px`;
}

export function toggleHeaderCollapse(viewMode: ViewMode, lines: number | undefined, hasExpanded: boolean): ViewMode {
  if (viewMode === 'hidden') return 'full';
  if (viewMode === 'lines') return hasExpanded ? 'hidden' : 'full';
  return lines == null || lines === 0 ? 'hidden' : 'lines';
}

export function isClickToExpand(viewMode: ViewMode): boolean {
  return viewMode === 'hidden' || viewMode === 'lines';
}
