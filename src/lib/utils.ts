export function capitalize(source: string): string {
  const SKIP = ['amb', 'de', 'i', 'o'];
  return source.split(' ').map((word) => SKIP.indexOf(word) == -1 ? word.toUpperCase() : word).join(' ');
}

export function translate(menu: Menu, language: string | null): void {
  if (!language || language == "ca") {
    return;
  }

  menu!.sections.forEach((section) => {
    if (section.translations && section.translations[language]) {
      section.title = section.translations[language].title || section.title;
    }

    section.dishes.forEach((dish) => {
      if (dish.translations && dish.translations[language]) {
        dish.name = dish.translations[language].name || dish.name;
        dish.description = dish.translations[language].description || dish.description;
      }
    })
  })

}