const photoUpload = document.getElementById('photoUpload');
const preview = document.getElementById('preview');
const analyzeBtn = document.getElementById('analyzeBtn');
const analysisResult = document.getElementById('analysisResult');

const sceneInput = document.getElementById('sceneInput');
const intentInput = document.getElementById('intentInput');
const rewriteBtn = document.getElementById('rewriteBtn');
const rewriteResult = document.getElementById('rewriteResult');

let uploadedFile = null;

photoUpload.addEventListener('change', (event) => {
  const [file] = event.target.files;
  uploadedFile = file || null;

  if (!uploadedFile) {
    preview.classList.add('hidden');
    analyzeBtn.disabled = true;
    return;
  }

  const url = URL.createObjectURL(uploadedFile);
  preview.src = url;
  preview.classList.remove('hidden');
  analyzeBtn.disabled = false;
});

analyzeBtn.addEventListener('click', () => {
  if (!uploadedFile) {
    return;
  }

  const name = uploadedFile.name.toLowerCase();
  const sizeMB = uploadedFile.size / 1024 / 1024;

  let composition = 82;
  let exposure = 84;
  let storytelling = 80;

  if (name.includes('night') || name.includes('夜')) {
    exposure -= 6;
    storytelling += 5;
  }

  if (sizeMB < 1) {
    composition -= 5;
  } else if (sizeMB > 5) {
    storytelling += 3;
  }

  const total = Math.round((composition + exposure + storytelling) / 3);

  analysisResult.textContent = `综合评分：${total}/100\n
构图：${composition} 分\n曝光与色彩：${exposure} 分\n故事表达：${storytelling} 分\n
建议：\n1) 尝试将主体放在三分线交点，提升画面张力。\n2) 若暗部细节偏少，可适当提高曝光或使用补光。\n3) 拍摄前先明确“这张照片要表达什么”，更容易打动人。`;
  analysisResult.classList.remove('hidden');
});

rewriteBtn.addEventListener('click', () => {
  const scene = sceneInput.value.trim();
  const rawIntent = intentInput.value.trim();

  if (!scene || !rawIntent) {
    rewriteResult.textContent = '请先填写「场景描述」和「你想表达的话」。';
    rewriteResult.classList.remove('hidden');
    return;
  }

  const shortened = rawIntent
    .replace(/然后|就是|其实|可能|有点|那个/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const concise = shortened.length > 88 ? `${shortened.slice(0, 88)}…` : shortened;

  rewriteResult.innerHTML = `<strong>建议口头表达：</strong>\n在「${scene}」这个场景下，我想重点说三点：\n1) 核心结论：${concise}\n2) 影响范围：对团队与进度的影响我会给出明确说明。\n3) 下一步动作：我会同步可执行计划与时间点，确保大家对齐预期。\n\n你可以按“结论先行 → 原因补充 → 行动收口”的结构来讲，更清晰。`;
  rewriteResult.classList.remove('hidden');
});
