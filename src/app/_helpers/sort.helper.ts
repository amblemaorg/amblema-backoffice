export class SortHelper {
  /**
   * Newest school year first (current year as the first option).
   * Uses startDate when both records have it, otherwise the name ("2025 - 2026").
   * Returns a new array; the source (e.g. store state) is not mutated.
   */
  static schoolYearsDesc<T extends { name?: string; startDate?: string }>(schoolYears: T[]): T[] {
    return [...(schoolYears || [])].sort((a, b) => {
      if (a.startDate && b.startDate) {
        return b.startDate.localeCompare(a.startDate);
      }
      return (b.name || '').localeCompare(a.name || '');
    });
  }

  /** Alphabetical by name, ignoring case and accents. Returns a new array. */
  static byName<T extends { name?: string }>(items: T[]): T[] {
    return SortHelper.byText(items, (item) => item.name);
  }

  /** Alphabetical by the text returned for each item, ignoring case and accents. Returns a new array. */
  static byText<T>(items: T[], getText: (item: T) => string): T[] {
    return [...(items || [])].sort((a, b) =>
      (getText(a) || '').localeCompare(getText(b) || '', 'es', { sensitivity: 'base', numeric: true })
    );
  }
}
