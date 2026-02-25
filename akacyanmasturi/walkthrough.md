# 画像抽出作業完了報告

## 概要
ターゲットサイト（`https://balancetec.co.jp/project/akachan-matsuri.html`）から画像ファイルを抽出し、`media/` ディレクトリに保存しました。

## 実施内容
1. **ソースコード解析**:
    - HTMLおよびCSSファイルを解析し、画像ファイル（`<img>`タグ、`og:image`、CSSの`url()`）のURLを特定しました。
2. **画像抽出**:
    - 合計 **57ファイル** の画像をダウンロードしました。
3. **ファイル構成の維持**:
    - リモートサーバー上のディレクトリ構造をそのままローカルの `media/` フォルダ内に再現しました。
    - 例: `https://balancetec.co.jp/data/themes/getta/img/logo.png`  
      → `media/data/themes/getta/img/logo.png`

## 確認事項
- `media/` フォルダ内に画像が保存されていることを確認してください。
- サイトの表示に必要な画像アセットが含まれています。

## 削除ファイル
- 作業用の一時ファイル（`temp_source.html`, `download_images.py`）は削除済みです。
