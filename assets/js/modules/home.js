const HomeView = {
  renderLessons(lessons) {
    const grid = document.getElementById('lessons-grid');
    if (!grid) return;

    grid.innerHTML = lessons
      .map(
        (lesson) => `
      <article class="lesson-card" data-lesson-id="${lesson.id}">
        <div class="lesson-card-header">
          <span class="lesson-order">الدرس ${lesson.order}</span>
        </div>
        <h3>${lesson.titleAr}</h3>
        <p class="lesson-en">${lesson.titleEn}</p>
        <p class="lesson-desc">${lesson.description}</p>
        <div class="lesson-tags">
          ${lesson.stats.mcq ? `<span class="tag">${lesson.stats.mcq} اختيار من متعدد</span>` : ''}
          ${lesson.stats.truefalse ? `<span class="tag">${lesson.stats.truefalse} صح / خطأ</span>` : ''}
          ${lesson.stats.matching ? `<span class="tag">${lesson.stats.matching} مزاوجة</span>` : ''}
          ${lesson.stats.open ? `<span class="tag">${lesson.stats.open} أسئلة تحليلية</span>` : ''}
          ${lesson.stats.exercises ? `<span class="tag">${lesson.stats.exercises} تمارين</span>` : ''}
        </div>
        <div class="lesson-card-footer">
          <span class="lesson-meta-text">${lesson.stats.total} سؤال اختبار</span>
          <button class="btn btn-primary" type="button">فتح الدرس</button>
        </div>
      </article>
    `
      )
      .join('');

    grid.querySelectorAll('.lesson-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.dataset.lessonId;
        window.App.openLesson(id);
      });
    });
  },

  updateStats(lessons) {
    const totalQuestions = lessons.reduce((sum, l) => sum + l.stats.total, 0);
    const totalLessons = lessons.length;

    const lessonsEl = document.getElementById('stat-lessons');
    const questionsEl = document.getElementById('stat-questions');

    if (lessonsEl) lessonsEl.textContent = totalLessons;
    if (questionsEl) questionsEl.textContent = totalQuestions + '+';
  },
};

window.HomeView = HomeView;
