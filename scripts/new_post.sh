#!/usr/bin/env bash
set -euo pipefail

export LANG="${LANG:-en_US.UTF-8}"
export LC_ALL="${LC_ALL:-en_US.UTF-8}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
POST_DIR="${SCRIPT_DIR}/../post"

mkdir -p "$POST_DIR"

DATE_STR=$(date '+%Y-%m-%d %H:%M')

read -erp "标题 (title) [template]: " title
title="${title:-template}"

read -erp "描述 (description) [描述]: " description
description="${description:-描述}"

read -erp "分类 (category) [记录]: " category
category="${category:-记录}"

read -erp "标签 (tags, 英文逗号隔开) [Tag1]: " tags_input
tags_input="${tags_input:-Tag1}"

IFS=',' read -ra tag_arr <<< "$tags_input"
tags_yaml=""
for tag in "${tag_arr[@]}"; do
    tag="$(echo "$tag" | xargs)"
    [ -n "$tag" ] && tags_yaml="${tags_yaml}  - ${tag}"$'\n'
done

read -erp "文件名 (不含扩展名) [${title}]: " filename
filename="${filename:-$title}"
filename=$(echo "$filename" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')

filepath="${POST_DIR}/${filename}.md"

if [ -f "$filepath" ]; then
    read -erp "文件 ${filepath} 已存在，是否覆盖？(y/N): " overwrite
    [ "$overwrite" != "y" ] && echo "已取消。" && exit 0
fi

cat > "$filepath" <<EOF
---
title: ${title}
date: ${DATE_STR}
description: ${description}
image: "../public/assets/images/arch1.jpg"
category: ${category}
tags:
${tags_yaml}published: false
sitemap: false
---
EOF

echo "✅ 文件已创建: ${filepath}"
