import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useCallback,
} from 'react';
import { useDebounce } from '../../hooks';
import { AlertService } from '../../services';

export type DragDropRef = {
  setFile: (file: File) => void;
  deleteFile: (index?: number) => File[];
  clearFiles: () => void;
};

type DragDropType = {
  label: string;
  fileTypes?: Array<string>;
  onFile: (files: Array<File> | File | null) => void;
  wrongFileTypeMessage?: string;
  fileTypesMassage?: string;
  canSeeFile?: boolean;
  maxSize?: number;
  multiple?: boolean;
  disabled?: boolean;
  dragDropName?: string;
};

export const DragDrop = forwardRef<DragDropRef, DragDropType>(
  (
    {
      label,
      fileTypes = ['application/pdf', 'image/png', 'image/jpeg'],
      onFile,
      wrongFileTypeMessage = '',
      fileTypesMassage,
      maxSize = 5000000,
      multiple = false,
      disabled,
      dragDropName,
    },
    ref
  ) => {
    const dropZoneRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<Array<File>>([]);
    const [dragCount, setDragCount] = useState(0);

    const [isEventsAttached, setIsEventsAttached] = useState(false);

    useImperativeHandle(ref, () => ({
      setFile: (file: File) => {
        setFiles(multiple ? [...files, file] : [file]);
      },
      deleteFile: (index?: number) => {
        if (multiple && index === undefined) return files; //SE N TIVER INDEX E FOR MULTIPLE, N FAZ NADA
        const newFiles = multiple ? files.filter((a, i) => i !== index) : [];
        setFiles(newFiles);
        return newFiles;
      },
      clearFiles: () => {
        setFiles([]);
      },
    }));

    function removeAllEvents() {
      if (!dropZoneRef.current) return;
      dropZoneRef.current.removeEventListener('dragenter', handleDragIn);
      dropZoneRef.current.removeEventListener('dragleave', handleDragOut);
      dropZoneRef.current.removeEventListener('dragover', handleDrag);
      dropZoneRef.current.removeEventListener('drop', handleDrop);
    }

    useDebounce(
      () => {
        if (dropZoneRef.current && !isEventsAttached && !disabled) {
          dropZoneRef.current.addEventListener('dragenter', handleDragIn);
          dropZoneRef.current.addEventListener('dragleave', handleDragOut);
          dropZoneRef.current.addEventListener('dragover', handleDrag);
          dropZoneRef.current.addEventListener('drop', handleDrop);
          setIsEventsAttached(true);
        } else if (disabled) {
          removeAllEvents();
          setIsEventsAttached(false);
        }
      },
      400,
      [dropZoneRef.current, disabled, isEventsAttached]
    );

    useEffect(() => {
      return () => {
        removeAllEvents();
      };
    }, []);

    const [hasIniciated, setHasIniciated] = useState(false);
    useEffect(() => {
      if (hasIniciated) {
        if (multiple && files.length) {
          onFile(files);
          setFiles([]);
        } else if (!multiple) {
          onFile(files[0]);
        }
      }
      setHasIniciated(true);
    }, [files]);

    const handleDragIn = useCallback((e: DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setDragCount((c) => c + 1);
      if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    }, []);

    const handleDragOut = useCallback((e: DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setDragCount((c) => c - 1);
      if (dragCount > 0) return;
      setIsDragging(false);
    }, []);

    const handleDrag = useCallback((e: DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    }, []);

    const handleDrop = useCallback((e: DragEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        let f = Object.values(e.dataTransfer.files);
        f = multiple ? f : f.filter((a, i) => i === 0); // SE N FOR MULTIPLO, ARRAY DE 1 ITEM SÓ
        setDragCount(0);
        setIsDragging(false);
        e.dataTransfer.clearData();

        f.forEach((file) => {
          if (!file) return;
          setFileIfHasType(file);
        });
      }
    }, []);

    function getSizeName(size: number) {
      const KB = 1000;
      const MEGA = 1000 * KB;
      const GIGA = 1000 * MEGA;

      let sufix,
        tamanho: number = 0;
      if (size < KB) {
        tamanho = size;
        sufix = 'bytes';
      } else if (size < MEGA) {
        tamanho = size / KB;
        sufix = 'kbytes';
      } else if (size < GIGA) {
        tamanho = size / MEGA;
        sufix = 'megas';
      } else {
        tamanho = size / GIGA;
        sufix = 'gigas';
      }

      tamanho = Math.floor(tamanho);
      return `${tamanho} ${sufix}`;
    }

    function setFileIfHasType(file: File) {
      if (!fileTypes.find((t) => file.type === t)) {
        AlertService.notice(
          wrongFileTypeMessage?.length
            ? wrongFileTypeMessage
            : 'Tipo de arquivo não permitido'
        );
        return;
      }

      if (maxSize && file.size > maxSize) {
        AlertService.notice('Tamanho máximo de ' + getSizeName(maxSize));
        return;
      }
      setFiles((files) => [...files, file]);
    }

    const FILE_NAME: JSX.Element = useMemo(() => {
      return (
        <>
          <div className="attachment-preview mb-2 mt-2">
            <i className="material-icons">attachment</i>
            <div className="m-paragraph small ml-3 mr-5">{label}</div>
            {/* <i className="material-icons">info</i> */}
          </div>
        </>
      );
    }, [label]);

    const FILE_DROPZONE: JSX.Element = useMemo(() => {
      return (
        <div
          className={'m-drag-drop' + (isDragging ? ` over` : '')}
          ref={(node) => {
            if (node) {
              dropZoneRef.current = node;
            }
          }}
        >
          <input
            type="file"
            id={'file' + (dragDropName ? `-${dragDropName}` : '')}
            disabled={disabled}
            style={{ display: 'none' }}
            multiple={multiple}
            onClick={(e) => {
              (e.currentTarget.value as any) = null;
            }}
            onChange={(e) => {
              if (e.target.files?.length) {
                // console.log('tipo arquivo', e.target.files[0].type);
                const f = Object.values(e.target.files);
                f.forEach((file) => {
                  setFileIfHasType(file);
                });
              }
            }}
          />
          <label
            htmlFor={'file' + (dragDropName ? `-${dragDropName}` : '')}
            onClick={(e) => {
              if (e.target !== e.currentTarget) e.currentTarget.click();
            }}
          >
            <button disabled={disabled} className="m-btn primary">
              <i className="material-icons">cloud_upload</i>
              <span>Selecionar arquivo</span>
            </button>
          </label>
          <div className="m-paragraph small mt-3">
            Ou arraste e solte seu arquivo
          </div>
          {fileTypesMassage && (
            <div className="m-paragraph small">{fileTypesMassage}</div>
          )}
        </div>
      );
    }, [isDragging, disabled]);

    return (
      <>
        {FILE_NAME}
        {FILE_DROPZONE}
      </>
    );
  }
);
