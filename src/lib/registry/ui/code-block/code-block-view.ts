export type ViewMode = 'hidden' | 'lines' | 'full';

export const LINE_HEIGHT = 24;
export const BODY_PADDING = 32;

export function lineCount(lines: number | undefined): number | undefined {
  if (lines == null || lines === 0) return undefined;
  return Math.abs(lines);
}

export function initialViewMode(lines: number | undefined, collapse: boolean): ViewMode {
  if (lines == null) return 'full';
  if (lines > 0 && collapse) return 'lines';
  if (lines > 0 && !collapse) return 'lines';
  return 'full';
}

export function showCollapseToggle(lines: number | undefined, collapse: boolean, hasContent: boolean): boolean {
  if (!hasContent) return false;
  if (collapse && lines == null) return true;
  if (lines === 0) return true;
  if (lines != null && lines < 0) return true;
  if (lines != null && lines > 0 && collapse) return true;
  return false;
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
  return `${limit * LINE_HEIGHT + BODY_PADDING}px`;
}

export function toggleHeaderCollapse(viewMode: ViewMode, lines: number | undefined, collapse: boolean): ViewMode {
  if (viewMode === 'hidden') return 'full';
  if (viewMode === 'lines') return 'full';
  if (lines === 0 || (collapse && lines == null)) return 'hidden';
  if (lines != null && lines !== 0) return 'lines';
  return viewMode;
}

export function isClickToExpand(viewMode: ViewMode): boolean {
  return viewMode === 'hidden' || viewMode === 'lines';
}
